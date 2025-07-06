
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary with updated credentials
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dz8vqkqkq/image/upload`;
    
    const uploadData = new FormData();
    uploadData.append('file', dataURI);
    uploadData.append('upload_preset', 'ml_default');
    uploadData.append('api_key', '772246953964682');
    
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary error:', errorText);
      throw new Error(`Cloudinary upload failed: ${response.status}`);
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ 
        url: result.secure_url,
        public_id: result.public_id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: `Upload failed: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
