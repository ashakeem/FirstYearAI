
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";


const CreateCardComponent = () => {
  return (
    <>
      <Card className="mt-6 lg:w-96 w-full border border-dotted border-gray-300">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            RoadMap Name
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur

          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="indigo"><FaPlus /></Button>
        </CardFooter>
      </Card>


    </>
  );
}

export default CreateCardComponent