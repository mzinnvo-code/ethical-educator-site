import ClassroomPacket from "../../components/ClassroomPacket.jsx";
import { getClassroomPacket } from "../../data/classroomPackets.js";

export default function PaperclipClassroomPacket({ navigate }) {
  const packet = getClassroomPacket("paperclip-maximizer");
  return <ClassroomPacket packet={packet} navigate={navigate} />;
}
