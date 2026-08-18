// Supabase Edge Function: admin
// Deploy: supabase functions deploy admin
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-pin",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const pin = req.headers.get("x-admin-pin");
  const expected = Deno.env.get("ADMIN_PIN");
  if (!expected || pin !== expected)
    return new Response(JSON.stringify({error:"Unauthorized"}), {status:401,headers:{...cors,"Content-Type":"application/json"}});

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const {data,error}=await supabase.from("submissions").select("*").order("submitted_at",{ascending:false});
  if(error) return new Response(JSON.stringify({error:error.message}),{status:500,headers:{...cors,"Content-Type":"application/json"}});
  return new Response(JSON.stringify(data),{headers:{...cors,"Content-Type":"application/json"}});
});
