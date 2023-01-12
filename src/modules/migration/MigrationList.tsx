import { CheckIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Box, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { NoData } from 'src/components/primitives/NoData';
import { ListTopInfoItem } from 'src/modules/dashboard/lists/ListTopInfoItem';

interface MigrationListProps {
  titleComponent: ReactNode;
  totalAmount: string;
  isBottomOnMobile?: boolean;
  children: ReactNode;
  onSelectAllClick: () => void;
  loading?: boolean;
  isAvailable: boolean;
  withCollateral?: boolean;
  withBorrow?: boolean;
  emodeCategoryId?: number;
  allSelected: boolean;
  numSelected: number;
  numAvailable: number;
}

export const MigrationList = ({
  titleComponent,
  totalAmount,
  isBottomOnMobile,
  children,
  onSelectAllClick,
  loading,
  isAvailable,
  withCollateral,
  withBorrow,
  allSelected,
  numSelected,
  numAvailable,
}: MigrationListProps) => {
  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  const isTablet = useMediaQuery(breakpoints.up('md'));
  const isMobile = useMediaQuery(breakpoints.down('xsm'));

  const assetColumnWidth =
    isMobile && !isTablet ? 45 : isTablet && !isDesktop ? 80 : isDesktop ? 120 : 80;

  const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';

  return (
    <Box sx={{ width: paperWidth, mt: { xs: isBottomOnMobile ? 2 : 0, lg: 0 } }}>
      <ListWrapper
        titleComponent={
          <Typography component="div" variant="h3" sx={{ mr: 4 }}>
            {titleComponent}
          </Typography>
        }
        topInfo={
          !(loading || +totalAmount <= 0) &&
          !isMobile && <ListTopInfoItem title={<Trans>Balance</Trans>} value={totalAmount || 0} />
        }
      >
        {(isAvailable || loading) && (
          <ListHeaderWrapper>
            <ListColumn align="center" maxWidth={isDesktop ? 60 : 40} minWidth={40}>
              <ListHeaderTitle onClick={onSelectAllClick}>
                <Typography variant="main12" sx={{ fontWeight: 700 }}>
                  {allSelected ? (
                    <Box
                      sx={(theme) => ({
                        border: `2px solid ${theme.palette.text.secondary}`,
                        background: theme.palette.text.secondary,
                        width: 16,
                        height: 16,
                        borderRadius: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      })}
                    >
                      <SvgIcon sx={{ fontSize: '14px', color: 'background.paper' }}>
                        <CheckIcon />
                      </SvgIcon>
                    </Box>
                  ) : (
                    <Box
                      sx={(theme) => ({
                        border: `2px solid ${theme.palette.text.secondary}`,
                        background: theme.palette.text.secondary,
                        width: 16,
                        height: 16,
                        borderRadius: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      })}
                    >
                      <NoData color="white" variant="secondary12" />
                    </Box>
                  )}
                </Typography>
              </ListHeaderTitle>
            </ListColumn>
            {isMobile && (
              <Box
                sx={{
                  width: 160,
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
            )}

            {!isMobile && (
              <ListColumn isRow maxWidth={assetColumnWidth} minWidth={assetColumnWidth}>
                <ListHeaderTitle>
                  <Trans>Assets</Trans>
                </ListHeaderTitle>
              </ListColumn>
            )}

            {withCollateral && !isMobile && (
              <ListColumn align="right">
                <ListHeaderTitle>
                  <Trans>Collateral change</Trans>
                </ListHeaderTitle>
              </ListColumn>
            )}

            {!isMobile && (
              <ListColumn align="right">
                <ListHeaderTitle>
                  <Trans>APY change</Trans>
                </ListHeaderTitle>
              </ListColumn>
            )}

            {withBorrow && !isMobile && (
              <ListColumn align="right">
                <ListHeaderTitle>
                  <Trans>APY type change</Trans>
                </ListHeaderTitle>
              </ListColumn>
            )}

            {!isMobile && (
              <ListColumn align="right" maxWidth={150} minWidth={150}>
                <ListHeaderTitle>
                  <Trans>Current v2 balance</Trans>
                </ListHeaderTitle>
              </ListColumn>
            )}
          </ListHeaderWrapper>
        )}

        {children}
      </ListWrapper>
    </Box>
  );
};
