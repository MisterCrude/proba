import React from "react";
import { IUnit } from "@typing/unit";
import { IIdNameRecord } from "@typing/api";
import pattern from "@assets/pattern.jpg";
import useStyles from "./styles";

import {
    CardContent,
    CardMedia,
    Box,
    Fab,
    Typography,
    Grid,
    Link,
    Button,
    Chip,
} from "@material-ui/core";
import {
    ArrowBackIos as ArrowBackIosIcon,
    Phone as PhoneIcone,
    // Share as ShareIcon,
    MailOutline as MailOutlineIcone,
    Language as LanguageIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import LogoBox from "./LogoBox";

interface IProps {
    openedUnit: IUnit | undefined;
    onGoBack: () => void;
}

export const UnitBox: React.FC<IProps> = ({ openedUnit, onGoBack }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Fab
                aria-label="back"
                size="small"
                onClick={onGoBack}
                className={classes.backBotton}
            >
                <ArrowBackIosIcon fontSize="small" />
            </Fab>

            {openedUnit ? (
                <>
                    {/* TODO: add share button */}
                    {/* <Fab
                        aria-label="share"
                        size="small"
                        onClick={() => {}}
                        className={classes.shareBotton}
                    >
                        <ShareIcon fontSize="small" />
                    </Fab> */}

                    <Box className={classes.iconsList}>
                        <Fab size="small" className={classes.socialIcon}>
                            <FacebookIcon fontSize="small" />
                        </Fab>
                        <Fab size="small" className={classes.socialIcon}>
                            <InstagramIcon fontSize="small" />
                        </Fab>

                        {openedUnit.contact.site && (
                            <Fab
                                size="small"
                                href={openedUnit.contact.site}
                                className={classes.socialIcon}
                            >
                                <LanguageIcon fontSize="small" />
                            </Fab>
                        )}
                    </Box>

                    <CardMedia
                        className={classes.cardMedia}
                        image={pattern}
                        title="Contemplative Reptile"
                    >
                        <LogoBox unitData={openedUnit} />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Grid
                            container
                            spacing={2}
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h6" component="h3">
                                    {openedUnit.services.map(
                                        ({ id, name }: IIdNameRecord) => (
                                            <Chip
                                                key={id}
                                                className={classes.chip}
                                                label={name}
                                                size="small"
                                            />
                                        ),
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box display="flex" my={2}>
                            <Box flexGrow={1}>
                                <Box>
                                    <ul className={classes.contactsList}>
                                        {openedUnit.contact.email && (
                                            <Typography
                                                component="li"
                                                className={
                                                    classes.contactsListItem
                                                }
                                            >
                                                <MailOutlineIcone />

                                                <Link
                                                    target="_blank"
                                                    variant="body1"
                                                    href={`mailto:${openedUnit.contact.email}`}
                                                >
                                                    {openedUnit.contact.email}
                                                </Link>
                                            </Typography>
                                        )}

                                        {openedUnit.contact.phones && (
                                            <Typography
                                                component="li"
                                                className={
                                                    classes.contactsListItem
                                                }
                                            >
                                                <PhoneIcone />

                                                {openedUnit.contact.phones.map(
                                                    (
                                                        phone: string,
                                                        i: number,
                                                    ) => (
                                                        <span key={phone}>
                                                            {i > 0 && ", "}
                                                            {phone}
                                                        </span>
                                                    ),
                                                )}
                                            </Typography>
                                        )}
                                    </ul>
                                </Box>
                            </Box>
                        </Box>

                        <Box my={2}>
                            <Typography component="p" variant="body1">
                                {openedUnit.description}
                            </Typography>
                        </Box>

                        <Box mt={4}>
                            {openedUnit.contact.site && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    target="_blank"
                                    endIcon={<OpenInNewIcon />}
                                    href={openedUnit.contact.site}
                                >
                                    Przejdź na stronę
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </>
            ) : (
                <CardContent>No any data</CardContent>
            )}
        </Box>
    );
};
