import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import RightSide from "../components/common/RightSide";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What should I do if I forgot my password?",
      answer: "If you forgot your password, click on the 'Forgot Password?' link on the login page and follow the instructions to reset it."
    },
    {
      question: "How do I verify my email address?",
      answer: "After registering, you will receive a verification email with a code. Please check your email, find the code, and enter it in the designated field on the verification page."
    },
    {
      question: "Why can't I log in to my account?",
      answer: "If you are unable to log in, please check your email and password for accuracy. You can also reset your password if necessary."
    },
    {
      question: "How can I register for a new account?",
      answer: "To register for a new account, click on the 'Register' button and fill out the required fields. You will receive a confirmation email to verify your account."
    },
    {
      question: "How do I change my password?",
      answer: "To change your password, go to your User Info and select 'Change Password.' Follow the prompts to update it."
    },
    {
      question: "What if I don't receive the verification email?",
      answer: "If you don't receive the verification email, please check your spam or junk folder. You can also request a new verification email."
    },
  ];
  

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100  font-roboto">
      
      {/* FAQ Section */}
      <div className="w-full lg:w-1/2 bg-base-100 p-8 ">
        <h2 className="text-2xl font-bold mb-4">FAQs</h2>
        <div className="space-y-4 text-neutral">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-4 shadow cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">{faq.question}</p>
                {activeIndex === index ? (
                  <FiChevronUp className="text-primary" />
                ) : (
                  <FiChevronDown className="text-primary" />
                )}
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-base text-accent">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-primary justify-center items-center h-screen">
        <RightSide />
      </div>
    </div>
  );
};

export default FAQs;
