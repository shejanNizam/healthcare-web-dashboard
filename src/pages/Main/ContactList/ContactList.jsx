// export default function ContactList() {
//   return (
//     <>
//       <h3>ContactList</h3>
//     </>
//   );
// }
import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

const dummyContacts = [
  {
    id: 1,
    name: "Clementadua",
    email: "clementadua@gmail.com",
    description:
      "We are looking for a qualified and compassionate Registered Nurse to join our team. As a nurse in our organization, you will be responsible for providing high-quality patient care",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@gmail.com",
    description:
      "Experienced nurse needed for patient care and administration duties.",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    description:
      "Seeking a registered nurse with excellent communication skills and compassion.",
  },
];

export default function ContactList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h3 className="text-primary text-2xl font-bold mb-4">Contact List</h3>
      <div className=" grid grid-cols-1 xl:grid-cols-2 gap-4">
        {dummyContacts.map((contact) => (
          <Card
            key={contact.id}
            className="mb-4 bg-secondary"
            bodyStyle={{ padding: "16px" }}
            hoverable
          >
            <div className="flex justify-between font-semibold text-base mb-2">
              <Text>User name : {contact.name}</Text>
              <Text>Email : {contact.email}</Text>
            </div>
            <Paragraph
              className="text-sm mb-4"
              ellipsis={{ rows: 2, expandable: false, symbol: "see more" }}
            >
              {contact.description}
            </Paragraph>
            <Button
              type="primary"
              onClick={() => navigate(`/contact-list/${contact.id}`)}
            >
              Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
