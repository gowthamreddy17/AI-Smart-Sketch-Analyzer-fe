import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/supabaseClient'
import { Session } from '@supabase/supabase-js'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode // Optional fallback while loading
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback = <div>Loading...</div> }) => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Fetch the session
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    fetchSession()

    // Subscribe to session changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  if (loading) return <>{fallback}</>

  return session ? <>{children}</> : <Navigate to="/login" replace />
}

export default ProtectedRoute
