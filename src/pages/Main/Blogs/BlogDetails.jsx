// export default function BlogDetails() {
//   return (
//     <>
//       <h3>BlogDetails</h3>
//     </>
//   );
// }

import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function BlogDetails() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Button
        type="link"
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600"
      >
        &lt; Details
      </Button>

      <img
        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
        alt="Healthcare"
        className="rounded-md w-full max-h-72 object-cover mb-6"
      />

      <Typography>
        <Title level={4} className="text-blue-700 mb-4">
          Prioritize your privacy and are committed to protecting your personal
          information
        </Title>

        <Paragraph className="mb-6 text-base">
          We prioritize your privacy and are committed to protecting your
          personal information. We collect data such as your name, email, and
          job application details to help match you with relevant career
          opportunities, improve user experience, and communicate important
          updates. Your data is stored securely using encryption and other
          safety measures to prevent unauthorized access. We do not share your
          information with third parties without your consent, except when
          required by law or to fulfill our services. You have the right to
          access, update, or delete your data at any time. For inquiries, feel
          free to contact us.
        </Paragraph>

        <Title level={5} className="text-blue-700 mb-3">
          How We Use Your Information. Your personal data is used to:
        </Title>

        <ul className="list-disc list-inside mb-6 text-sm">
          <li>Connect you with job opportunities</li>
          <li>Improve user experience on the website</li>
          <li>Respond to inquiries and support requests</li>
          <li>Send relevant job alerts and notifications</li>
        </ul>

        <Paragraph className="text-base">
          Your data is stored securely using encryption and other safety
          measures to prevent unauthorized access. We do not share your
          information with third parties without your consent, except when
          required by law or to fulfill our services. You have the right to
          access, update, or delete your data at any time. For inquiries, feel
          free to contact us.
        </Paragraph>
      </Typography>
    </div>
  );
}
