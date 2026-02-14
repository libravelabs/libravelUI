// Components
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/core/button';
import { Label } from '@/components/ui/core/field';
import { Input } from '@/components/ui/core/input';
import { Loader } from '@/components/ui/core/loader';
import { TextField } from '@/components/ui/core/text-field';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <TextField isRequired>
                                <Label>Email address</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />

                                <InputError message={errors.email} />
                            </TextField>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    isDisabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <Loader className="h-4 w-4 animate-spin" />
                                    )}
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={login()}>Log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
