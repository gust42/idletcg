import { Card } from "../../components/card";

interface IUniqueCardProps {
  id: number;
}

export default function UniqueCard({ id }: IUniqueCardProps) {
  return <Card id={id} />;
}
