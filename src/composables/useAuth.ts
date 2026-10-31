import { computed, ref } from 'vue';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Module-level so every component and the router share one session.
const session = ref<Session | null>(null);
let ready: Promise<void> | null = null;

/** Without Supabase (local dev) editing is always allowed; data stays in localStorage. */
const canEdit = computed(() => !supabase || session.value !== null);

/** Loads the current session once and keeps it in sync. Safe to call repeatedly. */
export function initAuth(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      session.value = data.session;
      supabase.auth.onAuthStateChange((_event, next) => {
        session.value = next;
      });
    })();
  }
  return ready;
}

export function useAuth() {
  async function signIn(email: string, password: string) {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return { session, canEdit, authEnabled: supabase !== null, signIn, signOut };
}
