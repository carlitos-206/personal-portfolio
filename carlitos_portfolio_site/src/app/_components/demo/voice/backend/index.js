export const voice_api = async (transcript) => {
    // Create an array of promises that resolve to FormData objects.
    const formDataPromises = transcript.map(async (item) => {
      const formData = new FormData();
  
      // Append basic fields.
      formData.append('id', item.id);
      formData.append('sender', item.sender);
      formData.append('text', item.text);
  
      // Process the audio file only if this item is marked as an audio message
      // and a valid audio_file is provided.
      if (item.audio && item.audio_file) {
        let blob;
        if (typeof item.audio_file === 'string') {
          // If audio_file is a URL, fetch it and convert to a Blob.
          try {
            const response = await fetch(item.audio_file);
            blob = await response.blob();
          } catch (error) {
            console.error('Error fetching audio file:', error);
            throw new Error('Unable to fetch audio file');
          }
        } else if (item.audio_file instanceof Blob) {
          // If it's already a Blob (or File), use it directly.
          blob = item.audio_file;
        } else {
          console.warn(
            `Skipping file for item id ${item.id} due to invalid audio_file format.`
          );
        }
        if (blob) {
          // Use the blob’s MIME type to determine a proper file name.
          // For example, if the type is audio/webm then use .webm;
          // otherwise default to .m4a.
          const fileName =
            blob.type === 'audio/webm' ? 'recording.m4a' : 'recording.m4a';
          formData.append('file', blob, fileName);
        }
      }
  
      // Append the audio flag.
      formData.append('audio', item.audio);
  
      return formData;
    });
  
    // Wait for all FormData objects to be built.
    const mainSendOff = await Promise.all(formDataPromises);
  
    // Send each FormData object in its own POST request.
    for (const formData of mainSendOff) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/voice-demo`,
          {
            method: 'POST',
            // When using FormData, do not set the Content-Type header manually.
            body: formData,
          }
        );
        if (!res.ok) {
          console.error('Error sending form data:', res.statusText);
        }
      } catch (err) {
        console.error('Error during fetch:', err);
      }
    }
  };
  