/**
 * Copyright 2023 Arkemis S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Button, Dialog, Input, Spinner } from "@arkejs/ui";
import React, { useState } from "react";

const OTP_LENGTH = 4;

interface OtpDialogProps {
  open: boolean;
  loading: boolean;
  onClose(): void;
  onSubmit(otp: string): void;
}

export default function OtpDialog(props: OtpDialogProps) {
  const { open, loading, onClose, onSubmit } = props;
  const [otp, setOtp] = useState("");

  function handleClose() {
    setOtp("");
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(otp);
  }

  return (
    <Dialog open={open} title="OTP" onClose={handleClose}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <p className="text-sm text-white/70">
          We sent a {OTP_LENGTH}-digit verification code to your email. Enter it
          below to complete the login.
        </p>
        <Input
          type="text"
          name="otp"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
          }
          placeholder="OTP"
          autoComplete="one-time-code"
          inputMode="numeric"
          fullWidth
        />
        <Button
          color="primary"
          type="submit"
          disabled={otp.length !== OTP_LENGTH}
        >
          {loading ? <Spinner className="h-5 w-5" /> : "Confirm"}
        </Button>
        <p className="text-center text-xs text-white/50">
          Didn&apos;t receive the code? Close this window and log in again to
          get a new one.
        </p>
      </form>
    </Dialog>
  );
}
