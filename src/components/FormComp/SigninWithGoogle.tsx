import Image from "next/image";

function SigninWithGoogle() {
  return (
    <form>
      <button className="flex items-center gap-6 text-md rounded-lg  px-10 py-4 font-medium bg-transparent hover:bg-gray-400   transition duration-700 shadow-md shadow-gray-400 p-4">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={25}
          width={25}
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SigninWithGoogle;
