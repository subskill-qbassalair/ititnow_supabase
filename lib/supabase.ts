import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wvtgzztdkssuhcxxnhnw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2dGd6enRka3NzdWhjeHhuaG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2ODE2MDEsImV4cCI6MjAzMTI1NzYwMX0.1YX0nw05DtD-6g8mqWu-N8ERJ0Z2DqVRGre0NO3HBPU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
