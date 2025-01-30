import React from "react";
import { FaWallet, FaPiggyBank } from "react-icons/fa";
import { BsGraphUpArrow, BsGraphDownArrow, BsCreditCardFill } from "react-icons/bs";
import { FaPix, FaBarcode } from "react-icons/fa6";

interface IconProps {
  background_color: string;
  variant:
    | "wallet"
    | "piggy_bank"
    | "graph_up_arrow"
    | "graph_down_arrow"
    | "credit_card_fill"
    | "ticket"
    | "pix";
  size?: number;
}

const iconMap = {
    wallet: FaWallet,
    piggy_bank: FaPiggyBank,
    graph_up_arrow: BsGraphUpArrow,
    graph_down_arrow: BsGraphDownArrow,
    credit_card_fill: BsCreditCardFill,
    ticket: FaBarcode,
    pix: FaPix,
};

const Icon: React.FC<IconProps> = ({ variant, background_color, size }) => {
  const IconComponent = iconMap[variant];

  return (
    <span className={background_color}>
      {IconComponent ? <IconComponent size={size ? size : 18} /> : null}
    </span>
  );
};

export default Icon;
