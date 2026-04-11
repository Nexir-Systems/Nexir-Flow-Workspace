import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { EntityRecord } from '../../../api/types/entities';
import { filterAndSortEntityRecords } from '../../../core/entity-catalog-filter';
import { toggleFavoriteId } from '../../../core/favorites/favoriteIds';
import { useFavoriteIds } from '../../../core/favorites/useFavoriteIds';
import { useNotify } from '../../../core/notify/useNotify';
import {
  useCatalogFilterState,
  useEntityCatalogUiStore,
} from '../../../stores/entityCatalogUiStore';
import { StatusBadge } from '../../../ui/StatusBadge';

const PAGE_SIZES = [5, 8, 16] as const;

type Props = {
  rows: EntityRecord[];
  favoriteStarFilled?: boolean;
};

export function EntityCatalogTable(props: Props) {
  const resetPageSignal = useEntityCatalogUiStore((s) => s.resetPageSignal);
  return <EntityCatalogTableInner key={resetPageSignal} {...props} />;
}

function EntityCatalogTableInner({ rows, favoriteStarFilled }: Props) {
  const navigate = useNavigate();
  const notify = useNotify();
  const filterState = useCatalogFilterState();
  const favoriteIds = useFavoriteIds();

  const filtered = useMemo(
    () => filterAndSortEntityRecords(rows, filterState),
    [rows, filterState],
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const maxPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);
  const safePage = Math.min(page, maxPage);

  const pageRows = useMemo(() => {
    const start = safePage * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, safePage, rowsPerPage]);

  const isStarred = (id: string) => favoriteIds.includes(id);

  return (
    <Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          bgcolor: 'transparent',
        }}
      >
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.09 : 0.06),
              }}
            >
              <TableCell width={56} />
              <TableCell>Name</TableCell>
              <TableCell width={120}>Status</TableCell>
              <TableCell width={140}>Category</TableCell>
              <TableCell width={120}>Priority</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell width={200}>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.map((row) => {
              const showFilledStar = favoriteStarFilled || isStarred(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/app/entities/${row.id}/edit`)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      aria-label="favorite"
                      size="small"
                      onClick={() => {
                        const next = !isStarred(row.id);
                        toggleFavoriteId(row.id, next);
                        notify({
                          severity: 'info',
                          message: next
                            ? 'Added to Favorites.'
                            : 'Removed from Favorites.',
                        });
                      }}
                    >
                      {showFilledStar ? (
                        <StarIcon fontSize="small" color="warning" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }} noWrap>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{row.category}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{row.priority}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(row.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={PAGE_SIZES}
        count={filtered.length}
        rowsPerPage={rowsPerPage}
        page={safePage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </Box>
  );
}
