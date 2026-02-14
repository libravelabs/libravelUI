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
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <TextField isRequired>
                                <Label>Name</Label>
                                <Input
                                    autoFocus
                                    placeholder="Full name"
                                    name="name"
                                />
                                <InputError message={errors.name} />
                            </TextField>

                            <TextField isRequired>
                                <Label>Email address</Label>
                                <Input
                                    type="email"
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </TextField>

                            <TextField isRequired>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </TextField>

                            <TextField isRequired>
                                <Label>Confirm password</Label>
                                <Input
                                    type="password"
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </TextField>

                            <Button
                                type="submit"
                                className="w-full"
                                tabIndex={5}
                                isPending={processing}
                                data-test="register-user-button"
                            >
                                {processing && <Loader />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
