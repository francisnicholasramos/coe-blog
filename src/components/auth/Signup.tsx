import {Form, Input, Button} from "@heroui/react";

const Signup = () => {
  return (
    <div className="flex flex-col items-center mt-2 mx-auto p-3 gap-y-2 justify-center w-full min-w-xs max-w-sm">
      <h1 className="text-2xl">Sign Up</h1>
      <Form className="w-full">
        {/* username field */}
        <Input 
          label="Username" 
          type="text" 
          className="border border-gray-300 rounded-xl"
          required
        />

        {/* username field */}
        <Input 
          label="Email" 
          type="email" 
          className="border border-gray-300 rounded-xl"
          required
        />

        {/* password field */}
        <Input 
          label="Password" 
          type="Password" 
          className="border border-gray-300 rounded-xl"
          required
        />

        <Button
          type="submit"
          className="bg-black text-white min-w-full"
        >
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default Signup

