import React, { memo } from "react";
import useStyles from "./styles";

import { Typography } from "@material-ui/core";
import { RoomOutlined as RoomOutlinedIcon } from "@material-ui/icons";

interface IProps {
    title: string;
    subtitle: string;
    large?: boolean;
    whiteText?: boolean;
}

export const Title: React.FC<IProps> = memo(
    ({ title, subtitle, large, whiteText, children }) => {
        const classes = useStyles();

        return (
            <>
                <Typography
                    component="h4"
                    variant={large ? "h5" : "h6"}
                    className={whiteText ? classes.whiteText : classes.darkText}
                >
                    {title}
                </Typography>
                {children && children}
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={`${classes.subtitle}
                        ${whiteText ? classes.whiteText : classes.grayText}`}
                >
                    <RoomOutlinedIcon
                        fontSize="small"
                        className={classes.roomIcon}
                    />
                    {subtitle}
                </Typography>
            </>
        );
    },
);
