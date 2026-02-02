import ChatClient from "../../components/ChatClient";

export default async function ChatPage({ params, searchParams }) {
    const { chatId } = await params;
    const { message } = await searchParams;

    return (
        <div className="flex flex-col h-full">
            <div className="bg-[#212121] pt-25 h-full w-full flex flex-col items-center gap-4">
                <ChatClient initialMessage={message || ""} chatId={chatId} />
            </div>
        </div>
    );
}
