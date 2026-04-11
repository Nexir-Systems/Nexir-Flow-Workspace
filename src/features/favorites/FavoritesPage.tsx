import { Alert, Button, Card, CircularProgress, Divider } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Link, useNavigate } from 'react-router';
import { useMemo } from 'react';
import { useEntitiesQuery } from '../../queries/entities';
import { useFavoriteIds } from '../../core/favorites/useFavoriteIds';
import { filterAndSortEntityRecords } from '../../core/entity-catalog-filter';
import {
  useCatalogFilterState,
  useEntityCatalogUiStore,
} from '../../stores/entityCatalogUiStore';
import { EmptyState } from '../../ui/EmptyState';
import { Page, PageHeader } from '../../ui/layout';
import { EntityCatalogToolbar } from '../entities/components/EntityCatalogToolbar';
import { EntityCatalogTable } from '../entities/components/EntityCatalogTable';

export function FavoritesPage() {
  const navigate = useNavigate();
  const q = useEntitiesQuery();
  const favoriteIds = useFavoriteIds();
  const filterState = useCatalogFilterState();
  const resetFilters = useEntityCatalogUiStore((s) => s.resetFilters);

  const favRows = useMemo(() => {
    const all = q.data ?? [];
    const set = new Set(favoriteIds);
    return all.filter((e) => set.has(e.id));
  }, [q.data, favoriteIds]);

  const filtered = useMemo(
    () => filterAndSortEntityRecords(favRows, filterState),
    [favRows, filterState],
  );

  if (q.isLoading && !q.data) {
    return (
      <Page sx={{ minHeight: '50vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Page>
    );
  }

  if (q.isError) {
    return (
      <Page>
        <PageHeader title="Favorites" description="Starred entities from your catalog." />
        <Alert severity="error">{(q.error as Error).message}</Alert>
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title="Favorites"
        description="Same search and filters as Entities. Stars stay filled; open a row to edit."
        actions={
          <Button
            component={Link}
            to="/app/entities"
            variant="outlined"
            size="large"
            startIcon={<TableRowsIcon />}
          >
            All entities
          </Button>
        }
      />

      {favRows.length === 0 ? (
        <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden' }}>
          <EmptyState
            title="No favorites yet"
            description="Star rows in Entities to add them here."
            actionLabel="Go to entities"
            onAction={() => navigate('/app/entities')}
          />
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden' }}>
          <EmptyState
            title="No matching favorites"
            description="Your current filters hide every starred row. Clear filters to see them again."
            actionLabel="Clear filters"
            onAction={() => resetFilters()}
          />
        </Card>
      ) : (
        <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden' }}>
          <EntityCatalogToolbar />
          <Divider />
          <EntityCatalogTable rows={favRows} favoriteStarFilled />
        </Card>
      )}
    </Page>
  );
}
