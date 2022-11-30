import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListWrapper } from 'src/components/lists/ListWrapper';

interface MigrationListProps {
  titleComponent: ReactNode;
  isBottomOnMobile?: boolean;
  children: ReactNode;
  onSelectAllClick: () => void;
}

export const MigrationList = ({
  titleComponent,
  isBottomOnMobile,
  children,
  onSelectAllClick,
}: MigrationListProps) => {
  const { breakpoints } = useTheme();
  const isTablet = useMediaQuery(breakpoints.up('md'));
  const paperWidth = isTablet ? 'calc(50% - 8px)' : '100%';

  return (
    <Box sx={{ width: paperWidth, mt: { xs: isBottomOnMobile ? 2 : 0, md: 0 } }}>
      <ListWrapper titleComponent={titleComponent}>
        <ListHeaderWrapper>
          <ListColumn align="center" maxWidth={100}>
            <ListHeaderTitle onClick={onSelectAllClick}>
              <Typography variant="main12">
                <Trans>Select all</Trans>
              </Typography>
            </ListHeaderTitle>
          </ListColumn>

          <ListColumn isRow maxWidth={280}>
            <ListHeaderTitle>
              <Trans>Asset</Trans>
            </ListHeaderTitle>
          </ListColumn>

          <ListColumn align="right">
            <ListHeaderTitle>
              <Trans>Current balance</Trans>
            </ListHeaderTitle>
          </ListColumn>
        </ListHeaderWrapper>

        {children}
      </ListWrapper>
    </Box>
  );
};
