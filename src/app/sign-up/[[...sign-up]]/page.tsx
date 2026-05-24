import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="h-screen flex items-center justify-between p-8">
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M 26.609375 29.023438 L 3.425781 29.023438 L 3.425781 26.707031 L 24.3125 26.707031 L 24.3125 23.242188 L 3.390625 23.242188 L 3.441406 0.015625 L 11.46875 0.015625 L 11.46875 17.117188 L 9.167969 17.117188 L 9.167969 2.335938 L 5.738281 2.335938 L 5.695312 20.925781 L 26.609375 20.925781 L 26.609375 29.023438"
          />
        </svg>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl xms:text-4xl md:text-6xl font-bold">Happening Now</h1>
        <h1 className="text-2xl">Join today</h1>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'w-full',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              formButtonPrimary:
                'bg-white hover:bg-gray-900 text-black rounded-full font-bold normal-case ',
              formFieldInput: 'py-2 px-6 rounded-full text-black w-72',
              formFieldLabel: 'text-black-400',
              footerActionLink: 'text-blue-500',
              identityPreviewText: 'text-white',
              identityPreviewEditButton: 'text-blue-500',
              //footer: 'hidden',
            },
          }}
        />
      </div>
    </div>
  );
};
export default SignUpPage;
