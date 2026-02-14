import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/core/button';
import { Label } from '@/components/ui/core/field';
import { Input } from '@/components/ui/core/input';
import { Loader } from '@/components/ui/core/loader';
import { TextField } from '@/components/ui/core/text-field';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirm your password"
            description="This is a secure area of the application. Please confirm your password before continuing."
        >
            <Head title="Confirm password" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <TextField isRequired>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                autoFocus
                            />

                            <InputError message={errors.password} />
                        </TextField>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                isDisabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Loader />}
                                Confirm password
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
