import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Petshop, Service } from "@prisma/client";

interface ServiceItemProps {
  petshop: Petshop;
  service: Service;
}

const ServiceCard = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent>
        <Image src={service.imageUrl} alt="" />
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
