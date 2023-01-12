import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListWrapper } from 'src/components/lists/ListWrapper';

import { MigrationSelectionBox } from './MigrationSelectionBox';

interface MigrationMobileListProps {
  titleComponent: ReactNode;
  isBottomOnMobile?: boolean;
  children: ReactNode;
  onSelectAllClick: () => void;
  loading?: boolean;
  isAvailable: boolean;
  emodeCategoryId?: number;
  allSelected: boolean;
  numSelected: number;
  numAvailable: number;
}

export const MigrationMobileList = ({
  titleComponent,
  isBottomOnMobile,
  children,
  onSelectAllClick,
  loading,
  isAvailable,
  allSelected,
  numSelected,
  numAvailable,
}: MigrationMobileListProps) => {
  return (
    <Box sx={{ width: '100%', mt: { xs: isBottomOnMobile ? 2 : 0, lg: 0 } }}>
      <ListWrapper
        titleComponent={
          <Typography component="div" variant="h3" sx={{ mr: 4 }}>
            {titleComponent}
          </Typography>
        }
      >
        {(isAvailable || loading) && (
          <ListHeaderWrapper>
            <ListColumn align="center" maxWidth={40} minWidth={40}>
              <MigrationSelectionBox
                allSelected={allSelected}
                numSelected={numSelected}
                onSelectAllClick={onSelectAllClick}
              />
            </ListColumn>

            <Box
              sx={{
                width: 140,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="subheader2" color="text.secondary">
                <Trans>
                  {numSelected}/{numAvailable} assets selected
                </Trans>
              </Typography>
            </Box>
          </ListHeaderWrapper>
        )}

        {children}
      </ListWrapper>
    </Box>
  );
};
