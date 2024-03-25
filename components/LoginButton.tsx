"use client";

import { supabase } from "@/utils/supabaseClient";

const LoginButton = () => {

    async function signInWithTwitter() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: 'http://localhost:3001/dashboard'
        }
      })
    }

    return (
        <button className="btn btn-wide btn-primary" onClick={signInWithTwitter}>Login X</button>
    )
}

export default LoginButton;