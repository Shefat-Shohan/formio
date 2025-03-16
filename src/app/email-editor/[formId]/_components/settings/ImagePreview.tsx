import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ImagePReviewProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
};

const ImagePreview = ({
  label,
  value,
  handleInputChange,
}: ImagePReviewProps) => {
  return (
    <div>
      <Label htmlFor="">{label}</Label>
      <img
        src={value}
        alt={value}
        className="w-full h-[150px] object-cover border-white/15 rounded mt-1.5 mb-3"
      />
      <span>Iamge url</span>
      <Input
        className="placeholder:text-text-white bg-[#171717] border border-white/15 mt-1.5"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default ImagePreview;

/*
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Formio");
    data.append("cloud_name", "dqud02k3f");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dqud02k3f/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedIamgeUrl = await res.json();

    console.log(uploadedIamgeUrl.url);
  };
*/
