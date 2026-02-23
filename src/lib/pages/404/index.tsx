import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/lib/components/ui/button';

const Page404 = () => {
  return (
    <>
      <div className="grid gap-2 p-12 text-center">
        <Image
          alt="404 Illustration"
          height={320}
          src="/assets/404 Error-amico.svg"
          width={320}
        />
        <Button asChild variant="link">
          <a className="text-xs" href="https://storyset.com/web">
            Web illustrations by Storyset
          </a>
        </Button>
      </div>

      <div className="grid gap-6 text-center">
        <div className="grid gap-2">
          <h3>Page not Found</h3>
          <p>It&apos;s Okay!</p>
        </div>

        <div>
          <Button asChild>
            <Link href="/">Let&apos;s Go Back</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page404;
