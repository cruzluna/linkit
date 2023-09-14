type skillChipProps = {
  // outer: string;
  // inner: string;
  // skill: string;
  loading: boolean;
  children: string;
};

export default function SkillChip({ loading, children }: skillChipProps) {
  // className={`bg-[${outer}] inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-[${inner}] m-1`}
  if (loading) {
    return (
      <div
        className={
          "bg-noto-purple inline-flex items-center rounded-full px-3 py-1 text-sm font-medium m-1 animate-pulse"
        }
      >
        <span>{children}</span>
      </div>
    );
  } else {
    return (
      <>
        <div
          className={
            "bg-noto-purple inline-flex items-center rounded-full px-3 py-1 text-sm text-[#242784] font-medium m-1"
          }
        >
          <span>{children}</span>
        </div>
      </>
    );
  }
}
