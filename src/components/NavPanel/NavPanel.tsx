import React from 'react';
import { makeStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Introduction from '../Introduction/Introduction';

import './NavPanel.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="border tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className="tabpanel">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTabs = withStyles({
  root: {
    border: '2px solid #8be9fd',
    bordeRadius: '8px',
    backgroundColor: '#44475a'
  },
  indicator: {
    backgroundColor: '#bd93f9',
  },
})(Tabs);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles(() =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#bd93f9'
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <StyledTabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <StyledTab label="Introduction" />
          <StyledTab label="Resume" />
          <StyledTab label="Projects" />
        </StyledTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Introduction />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
