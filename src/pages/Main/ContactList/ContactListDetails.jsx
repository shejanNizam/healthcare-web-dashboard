// export default function ContactListDetails() {
//   return (
//     <>
//       <h3>ContactListDetails</h3>
//     </>
//   );
// }

import { Button, Card, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Text, Paragraph } = Typography;

const dummyContacts = [
  {
    id: 1,
    name: "Clementadua",
    email: "clementadua@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet torquent morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra ut massa convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultricies duis pharetra sit porttitor elementum sagittis elementum.\n\n
Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.`,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@gmail.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Details for John Doe...",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Details for Jane Smith...",
  },
];

export default function ContactListDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = dummyContacts.find((c) => c.id === Number(id));

  if (!contact) return <p className="text-center mt-8">Contact not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h3 className="text-blue-600 text-xl font-semibold mb-4">
        Contact Details
      </h3>
      <Button
        type="link"
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600"
      >
        &lt; Back
      </Button>

      <Card className="bg-blue-50 p-6" bordered={false}>
        <div className="flex justify-between font-semibold mb-6 text-base">
          <Text>Name : {contact.name}</Text>
          <Text>Email : {contact.email}</Text>
        </div>
        <Paragraph className="text-sm whitespace-pre-wrap">
          {contact.description}
        </Paragraph>
      </Card>
    </div>
  );
}
