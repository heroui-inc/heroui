import {ProgressCircle} from "@heroui/react";

export function CustomSvg() {
  return (
    <div className="flex items-end gap-6">
      <ProgressCircle aria-label="Thin circle" value={60}>
        <ProgressCircle.Track strokeWidth={2} viewBox="0 0 36 36">
          <ProgressCircle.TrackCircle cx={18} cy={18} r={17} strokeWidth={2} />
          <ProgressCircle.FillCircle cx={18} cy={18} r={17} strokeWidth={2} />
        </ProgressCircle.Track>
      </ProgressCircle>

      <ProgressCircle aria-label="Default circle" value={60}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>

      <ProgressCircle aria-label="Thick circle" value={60}>
        <ProgressCircle.Track strokeWidth={6} viewBox="0 0 36 36">
          <ProgressCircle.TrackCircle cx={18} cy={18} r={15} strokeWidth={6} />
          <ProgressCircle.FillCircle cx={18} cy={18} r={15} strokeWidth={6} />
        </ProgressCircle.Track>
      </ProgressCircle>
    </div>
  );
}
