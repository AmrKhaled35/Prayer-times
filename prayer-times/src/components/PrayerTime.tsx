interface PrayerTimeProps {
  name: string;
  time: string;
  icon: React.ReactNode;
}

function PrayerTime({ name, time, icon }: PrayerTimeProps) {
  return (
    <div className="prayer-time-item flex justify-between items-center rounded-lg p-3 shadow-md">
      <div className="flex items-center">
        <span className="text-amber-300 mr-2">
          {icon}
        </span>
        <span className="text-sm md:text-base text-white font-medium">{time}</span>
      </div>
      <div className="text-sm md:text-base text-white font-semibold">{name}</div>
    </div>
  );
}

export default PrayerTime;