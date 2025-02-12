// Use .webm if you are recording with "audio/webm"
export const voice_api_with_audio = async (audioBlob, phrase) => {
  try {
    const formData = new FormData();
    // If you're really recording webm, name it accordingly:
    formData.append("file", audioBlob, "recording.webm");
    // The backend currently does: text = request.form.get('text', '')
    // So let's append 'text' here:
    formData.append("text", phrase);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/voice-demo-init`,
      {
        method: "POST",
        body: formData,
        // DO NOT manually set 'Content-Type': fetch adds 'multipart/form-data' + boundary
      }
    );

    if (!response.ok) {
      console.error(
        "Backend returned an error:",
        response.status,
        response.statusText
      );
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error in voice_api_with_audio:", error);
    throw error;
  }
};
