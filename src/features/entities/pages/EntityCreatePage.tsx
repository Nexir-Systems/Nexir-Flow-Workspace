import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getSampleEntityPayload } from '../../../core/entity-form-sample';
import { useNotify } from '../../../core/notify/useNotify';
import { useCreateEntityMutation } from '../../../queries/entities';
import { FormActionsFooter, Page, PageBackLink, PageHeader } from '../../../ui/layout';
import { productCardPaddingSx } from '../../../ui/productCardPadding';
import { RecentEntitiesSection } from '../../../ui/RecentEntitiesSection';
import { EntityFormFields } from '../components/EntityFormFields';
import { entityFormSchema, type EntityFormValues } from '../model/entityFormSchema';

export function EntityCreatePage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const create = useCreateEntityMutation();

  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entityFormSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      category: 'general',
      priority: 'medium',
      owner: '',
    },
  });

  return (
    <Page>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', width: '100%' }}>
        <PageBackLink to="/app/entities">Entities</PageBackLink>
        <PageHeader
          title="New entity"
          description="Provide details across sections; actions are in the card below."
        />
      </Box>

      <Card className="nx-product-surface" variant="outlined">
        <Box sx={productCardPaddingSx}>
          <EntityFormFields register={form.register} errors={form.formState.errors} />
        </Box>
      </Card>

      <RecentEntitiesSection
        description="Open entity details to build this list (up to six, newest first). Click a row to jump to that record."
      />

      <Card className="nx-product-surface" variant="outlined">
        <Box sx={productCardPaddingSx}>
          {create.isError ? (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {(create.error as Error).message}
            </Alert>
          ) : null}
          <FormActionsFooter
            onCancel={() => navigate('/app/entities')}
            secondaryActions={
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  form.reset({ ...getSampleEntityPayload(), status: 'draft', category: 'general', priority: 'medium' });
                  notify({ severity: 'info', message: 'Sample values applied to the form.' });
                }}
              >
                Generate sample data
              </Button>
            }
            primaryLabel="Create entity"
            primaryLoading={create.isPending}
            onPrimary={form.handleSubmit(async (values) => {
              try {
                const now = new Date().toISOString();
                const activityId = `act-${crypto.randomUUID()}`;
                await create.mutateAsync({
                  ...values,
                  metadata: { source: 'ui' },
                  activity: [
                    {
                      id: activityId,
                      at: now,
                      label: 'Record created',
                    },
                  ],
                });
                notify({ severity: 'success', message: 'Entity created.' });
                navigate('/app/entities');
              } catch (e) {
                notify({
                  severity: 'error',
                  message: (e as Error).message ?? 'Unable to create entity.',
                });
              }
            })}
          />
        </Box>
      </Card>
    </Page>
  );
}
