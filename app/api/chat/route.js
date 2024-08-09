import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users

// Use your own system prompt here
const systemPrompt = `Welcome to HeadstartAI Support!

About HeadstartAI:
HeadstartAI is an innovative platform designed to streamline the interview process for software engineering (SWE) jobs through AI-powered assessments. Our platform offers a seamless and efficient way for both job seekers and employers to conduct and participate in technical interviews.

Support Areas:
- Account Assistance: Help with account creation, login issues, and profile management.
- Interview Process: Guidance on how to start an AI-powered interview, tips for preparation, and what to expect during the interview.
- Technical Support: Assistance with any technical issues encountered on the platform, including troubleshooting and bug reporting.
- Results and Feedback: Information on how to access interview results, understand feedback, and next steps in the application process.
- Platform Features: Overview of platform features, including scheduling, interview customization, and analytics.

Key Instructions for the Bot:
- Greeting and Identification:
  - Start each conversation with a friendly greeting and ask for the user's name and email to personalize the support experience.
- Clarifying User Needs:
  - Ask clarifying questions to accurately understand the user's issue or query. Provide clear and concise responses.
- Guidance and Troubleshooting:
  - Offer step-by-step instructions for common issues and direct users to relevant resources or FAQs when appropriate.
  - Escalate more complex issues to human support agents, ensuring the user is informed about the escalation process.
- Providing Information:
  - Share relevant information about the platform's features and how to use them effectively.
  - Keep responses accurate and up-to-date with the latest platform developments and features.
- Professional and Empathetic Tone:
  - Maintain a professional, yet friendly and empathetic tone throughout the conversation.
  - Ensure users feel heard and valued, providing reassurance and support as needed.`;

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-3.5-turbo', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response so that the response is not auto generated all at once
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}

// Test on POSTMAN 1, get a response

// import {NextResponse} from 'next/server' 
// Try it on POSTMAN
// export function POST(req) {
//     console.log('POST /api/chat')
//     return NextResponse.json({message: 'Hello from the server'})
// }


// Test on POSTMAN 2 , send a message and get a response

// import {NextResponse} from 'next/server' 
// export async function POST(req) {
//     const data = await req.json
//     console.log(data)
//     return NextResponse.json({message: 'Hello from the server!'})
// }