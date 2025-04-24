"use client";
import { getToken } from "@/service/openai/token";
import { PhoneCall, PhoneOff } from "lucide-react";
import React, { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VoiceAssistant({ assistance }: any) {
  const [connected, setConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    [],
  );

  function handleServerEvent(e: MessageEvent) {
    try {
      const event = JSON.parse(e.data);

      // Switch based on the type of event received
      switch (event.type) {
        // 1. Handle partial updates for the user's message
        case "response.text.delta": {
          const deltaText = event.delta;
          setMessages((prev) => {
            if (
              prev[prev.length - 1]?.from === "user" &&
              !event.response?.completed
            ) {
              const updatedText = prev[prev.length - 1].text + deltaText;
              const newArr = [...prev];
              newArr[newArr.length - 1] = { from: "user", text: updatedText };
              return newArr;
            } else {
              return [...prev, { from: "user", text: deltaText }];
            }
          });
          break;
        }

        // 2. Finalize the user's message when it's complete
        case "response.text.done": {
          const finalText = event.response.output[0].text || "";
          setMessages((prev) => {
            if (prev[prev.length - 1]?.from === "user") {
              const newArr = [...prev];
              newArr[newArr.length - 1] = { from: "user", text: finalText };
              return newArr;
            } else {
              return [...prev, { from: "user", text: finalText }];
            }
          });
          break;
        }

        // 3. Handle partial updates for the assistant's response
        case "response.text.delta.assistant": {
          const deltaText = event.delta;
          setMessages((prev) => {
            if (prev[prev.length - 1]?.from === "assistant") {
              const updatedText = prev[prev.length - 1].text + deltaText;
              const newArr = [...prev];
              newArr[newArr.length - 1] = {
                from: "assistant",
                text: updatedText,
              };
              return newArr;
            } else {
              return [...prev, { from: "assistant", text: deltaText }];
            }
          });
          break;
        }

        // 4. Finalize the assistant's response when it's complete
        case "response.done": {
          const fullText =
            event.response.output[0]?.content[0]?.transcript || "";
          setMessages((prev) => {
            if (prev[prev.length - 1]?.from === "assistant") {
              const newArr = [...prev];
              newArr[newArr.length - 1] = { from: "assistant", text: fullText };
              return newArr;
            } else {
              return [...prev, { from: "assistant", text: fullText }];
            }
          });
          break;
        }
      }
    } catch (err) {
      console.error("JSON parsing error in handleServerEvent:", err);
    }
  }

  async function init() {
    setIsLoading(true);
    try {
      // 1. Retrieve the ephemeral token for authenticating the session with OpenAI.
      const EPHEMERAL_KEY = await getToken();

      const assist = assistance;

      // 2. Create a new RTCPeerConnection instance to manage the WebRTC connection.
      const peer = new RTCPeerConnection();
      peerRef.current = peer;

      // 3. Create an audio element that will play the incoming audio stream from the assistant.
      const audioIa = document.createElement("audio");
      audioIa.autoplay = true;
      peer.ontrack = (e) => {
        audioIa.srcObject = e.streams[0];
      };

      // 4. Capture the audio stream from the user's microphone.
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = localStream;
      localStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, localStream));

      // 5. Create a data channel for exchanging messages (commands, updates, etc.) with the assistant.
      const dataChannel = peer.createDataChannel("oai-events");
      dataChannelRef.current = dataChannel;

      // 6. Attach the handleServerEvent function to the data channel's onmessage event.
      dataChannel.onmessage = handleServerEvent;

      // 7. Prepare the SDP (Session Description Protocol) exchange.
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      // 8. Send the SDP offer to OpenAI's realtime API to receive an SDP answer.
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        },
      });

      if (!sdpResponse.ok) {
        throw new Error(
          `Failed to fetch SDP answer: ${sdpResponse.statusText}`,
        );
      }

      // 9. Retrieve the SDP answer and set it as the remote description for the connection.
      const answer = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      await peer.setRemoteDescription(answer as RTCSessionDescriptionInit);

      // 10. Once the data channel opens, set the connection state and send initial session instructions.
      dataChannel.onopen = () => {
        setConnected(true);
        setIsLoading(false);
        console.log("🔔 DataChannel is open!");

        const initialMessage = {
          type: "conversation.item.create",
          item: {
            type: "message",
            role: "user",
            content: [
              {
                type: "input_text",
                text: assist.firstMessage,
              },
            ],
          },
        };

        dataChannel.send(
          JSON.stringify({
            type: "session.update",
            session: {
              instructions: `${assist.instructions}`,
              temperature: 0.8,
              tools: assist.tools,
              voice: assist.voice,
              input_audio_transcription: { model: "whisper-1" },
              tool_choice: "auto",
            },
          }),
        );

        dataChannel.send(JSON.stringify(initialMessage));
        dataChannel.send(JSON.stringify({ type: "response.create" }));
      };
      console.log("🔔 WebRTC connection established. The AI can now speak.");
    } catch (error) {
      console.error("Error initializing WebRTC connection:", error);
      stopConversation();
    } finally {
      setIsLoading(false);
    }
  }

  function stopConversation() {
    // Close the data channel if open
    if (
      dataChannelRef.current &&
      dataChannelRef.current.readyState === "open"
    ) {
      dataChannelRef.current.close();
    }

    // Stop all tracks in the local stream (microphone)
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Close the peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // Reset connection state
    setConnected(false);
    console.log("🔔 Conversation stopped.");
  }

  return (
    <>
      {!connected ? (
        <div
          className="flex items-center gap-1.5 self-stretch rounded-xl bg-[#131313] px-5 py-3 hover:cursor-pointer"
          onClick={init}
        >
          <PhoneCall className="h-4 w-4 text-white" />
          <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-white">
            {isLoading ? "Connecting..." : "Start Call"}
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-1.5 self-stretch rounded-xl bg-[#B81B1B] px-5 py-3 hover:cursor-pointer"
          onClick={stopConversation}
        >
          <PhoneOff className="h-4 w-4" />
          <div className="strokeWidth text-center text-base font-medium leading-[14.40px] text-white">
            End Call
          </div>
        </div>
      )}
    </>
  );
}
