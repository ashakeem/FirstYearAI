import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
const CardComponent = () => {
  return (
    <Card className="mt-6 lg:w-96 w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          RoadMap Name
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Sunt, odio laudantium molestias 
          obcaecati quibusdam quasi? Autem nobis fugiat 
          necessitatibus commodi voluptate fugit, rem amet 
          repellendus voluptates cumque quibusdam nisi doloremque.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="indigo">Read More</Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;