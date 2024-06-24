'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"

const Page = () => {
    const { register, registerPending } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [tc, setTc] = useState(false)
    const [errors, setErrors] = useState([])

    const toogleTc = event => {
        setTc(event.target.checked)
        if (tc && !errors.length)
            setErrors({ 'tc': ['Vous devez accepter les CGU pour vous inscrire'] })
        else
            setErrors([])
    }
    const submitForm = event => {
        event.preventDefault()
        if (tc)
            register({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation: passwordConfirmation,
                setErrors,
            })
        else
            setErrors({ 'tc': ['Vous devez accepter les CGU pour vous inscrire'] })
    }

    return (
        <form onSubmit={submitForm}>
            {/* First Name */}
            <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    className="block w-full mt-1"
                    onChange={event => setFirstName(event.target.value)}
                    required
                    autoFocus
                    autoComplete="given-name"
                />
                <InputError messages={errors.first_name} className="mt-2" />
            </div>

            {/* Last Name */}
            <div className="mt-4">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    className="block w-full mt-1"
                    onChange={event => setLastName(event.target.value)}
                    required
                    autoComplete="family-name"
                />
                <InputError messages={errors.last_name} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4">
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block w-full mt-1"
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                />
                <InputError messages={errors.email} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        className="block w-full mt-1"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <button className="absolute flex items-center justify-center w-6 h-6 top-2 right-2" title={showPassword ? 'Masquer' : 'Afficher'} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                    </button>
                </div>
                <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
                <Label htmlFor="passwordConfirmation">Confirmer le mot de passe</Label>
                <div className="relative">
                    <Input
                        id="passwordConfirmation"
                        type={showPassword ? "text" : "password"}
                        value={passwordConfirmation}
                        className="block w-full mt-1"
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        required
                    />
                    <button className="absolute flex items-center justify-center w-6 h-6 top-2 right-2" title={showPassword ? 'Masquer' : 'Afficher'} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                    </button>
                </div>
                <InputError messages={errors.password_confirmation} className="mt-2" />
            </div>

            {/* T&Cs */}
            <div className="block mt-4">
                <label
                    htmlFor="tc"
                    className="inline-flex items-center">
                    <input
                        id="tc"
                        type="checkbox"
                        className="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={event => toogleTc(event)}
                    />
                    <span className="ml-2 text-sm text-gray-600">J'accepte les CGU de ce site.</span>
                </label>
                <InputError messages={errors.tc} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="text-sm text-gray-600 underline hover:text-gray-900">
                    Already registered?
                </Link>

                <Button className="ml-4" disabled={registerPending}>{registerPending ? 'Veuillez patienter...' : 'Inscription'}</Button>
            </div>
        </form>
    )
}

export default Page
