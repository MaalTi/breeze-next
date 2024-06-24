'use client'

import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">Afin de valider votre inscription, pourriez-vous vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer par e-mail ? Cliquez ci-après si vous n'avez pas reçu l'e-mail (pensez à vérifier les spams).</div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">Un nouveau lien de vérification a été envoyé à l'adresse e-mail que vous avez fournie lors de l'inscription.</div>
            )}

            <div className="flex items-center justify-between mt-4">
                <Button onClick={() => resendEmailVerification({ setStatus })}>Renvoyer l'e-mail de vérification</Button>
                <button
                    type="button"
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                    onClick={logout}>
                    Déconnexion
                </button>
            </div>
        </>
    )
}

export default Page
