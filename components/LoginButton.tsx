"use client";

import { supabase } from "@/utils/supabaseClient";

const LoginButton = () => {

    async function signInWithTwitter() {

      const protocol = window.location.protocol;
      const host = window.location.host;
      const redirectTo = `${protocol}//${host}/dashboard`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: redirectTo
        }
      })
    }

    return (
        <button className="btn btn-wide btn-primary" onClick={signInWithTwitter}>Login X</button>
    )
}

export default LoginButton;