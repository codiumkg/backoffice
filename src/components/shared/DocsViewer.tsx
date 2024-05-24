import { formatDocUrl } from "@/utils/utils";
import { Button } from "@nextui-org/react";

interface Props {
  docUrl: string;
}

export default function DocsViewer({ docUrl }: Props) {
  const viewUrl = formatDocUrl(docUrl);

  const handleOpen = () => {
    window.open(docUrl, "_blank");
  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 mt-10">
      <h1 className="text-sm text-center">Просмотр документа</h1>
      <div className="w-full h-auto relative px-32">
        <iframe
          src={viewUrl}
          className="w-full min-h-[800px] rounded-lg"
        ></iframe>
        <Button
          className="absolute top-3 right-3 mr-32 opacity-80"
          size="sm"
          onPress={handleOpen}
        >
          Открыть документ
        </Button>
      </div>
    </div>
  );
}
