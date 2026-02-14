import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/core/button';
import { Label } from '@/components/ui/core/field';
import { Input } from '@/components/ui/core/input';
import { Loader } from '@/components/ui/core/loader';
import { TextField } from '@/components/ui/core/text-field';
import AuthLayout from '@/layouts/auth-layout';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <AuthLayout
            title="Reset password"
            description="Please enter your new password below"
        >
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <TextField isRequired>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                readOnly
                            />
                            <InputError message={errors.email} />
                        </TextField>

                        <TextField isRequired>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </TextField>

                        <TextField isRequired>
                            <Label>Confirm password</Label>
                            <Input
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </TextField>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            isDisabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Loader />}
                            Reset password
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
