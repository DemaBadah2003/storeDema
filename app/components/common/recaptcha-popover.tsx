'use client';

import * as Popover from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';

interface RecaptchaPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (token: string) => void;
  trigger: React.ReactNode;
  verifyButtonText?: string;
}

export function RecaptchaPopover({
  open,
  onOpenChange,
  onVerify,
  trigger,
  verifyButtonText = 'Verify & Submit',
}: RecaptchaPopoverProps) {

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  const handleVerify = () => {
    // نقوم بتمرير string فارغ أو أي قيمة افتراضية لأن التوكن لم يعد مطلوباً
    onVerify(''); 
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white p-4 rounded-lg shadow-lg z-50"
          sideOffset={5}
          align="end"
        >
          <div className="flex flex-col gap-4">
            <Button
              type="button"
             variant="default"
              onClick={handleVerify}
              className="w-full"
            >
              {verifyButtonText}
            </Button>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}