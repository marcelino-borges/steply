import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { challengeActivityCardStyles } from "./styles";
import { NonExistingActivityDto } from "@/types/api/activity";
import Typography from "../typography";
import { COLORS } from "@/constants/colors";
import { isSameDay } from "date-fns";
import { CalendarIcon, PencilIcon, Trash2Icon } from "lucide-react-native";

interface ChallengeActivityCard {
  activity: NonExistingActivityDto;
  isLastInList?: boolean;
  onEdit: VoidFunction;
  onRemove: VoidFunction;
}

export default function ChallengeActivityCard({
  activity,
  isLastInList,
  onEdit,
  onRemove,
}: ChallengeActivityCard) {
  const { t } = useTranslation();

  const formatActivityDateRange = (startDate: Date, endDate: Date): string => {
    const startDay = startDate.getDate();
    const startMonth = t(
      `calendar.months.${startDate.toLocaleDateString("en", { month: "short" }).toLowerCase()}`
    );
    const endDay = endDate.getDate();
    const endMonth = t(
      `calendar.months.${endDate.toLocaleDateString("en", { month: "short" }).toLowerCase()}`
    );

    if (isSameDay(startDate, endDate)) {
      return t("challenge.dateRange.sameDay", {
        day: startDay,
        month: startMonth,
      });
    }

    if (
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      return t("challenge.dateRange.sameMonth", {
        startDay,
        endDay,
        month: startMonth,
      });
    }

    return t("challenge.dateRange.differentMonths", {
      startDay,
      startMonth,
      endDay,
      endMonth,
    });
  };

  return (
    <View
      style={[
        challengeActivityCardStyles.root,
        isLastInList && { borderBottomWidth: 0 },
      ]}
    >
      <View style={challengeActivityCardStyles.textsContainer}>
        <View style={challengeActivityCardStyles.datesRow}>
          <CalendarIcon size={14} color={COLORS.gray} />
          <Typography color={COLORS.gray} size="xs">
            {formatActivityDateRange(activity.startAt, activity.endAt)}
          </Typography>
        </View>
        <Typography weight="semibold">{activity.title}</Typography>
        {activity.description && (
          <Typography
            color={COLORS.gray}
            size="xs"
            style={{
              maxHeight: 100,
            }}
          >
            {activity.description}
          </Typography>
        )}
      </View>
      <View style={challengeActivityCardStyles.iconscontainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={onEdit}>
          <PencilIcon size={20} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
          <Trash2Icon color={COLORS.destructive} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
