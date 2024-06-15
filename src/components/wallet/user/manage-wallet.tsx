import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserWallet } from '@models/userwallet'
import useUpdateWallet from '@services/bills/update-wallet'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@ui/ui/card'
import { Form, FormField } from '@ui/ui/form'
import { Input } from '@ui/ui/input'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import updateWalletAtom from 'src/atoms/update-wallet'
import * as Yup from 'yup'

interface FormProps {
  balance: string
}

const walletSchema = Yup.object().shape({
  balance: Yup.string()
    .required()
    .matches(/^-?\d+$/, {
      balance: 'Invalid balance'
    })
})

const ManageWallet: FC<{ data: UserWallet }> = ({ data }) => {
  const form = useForm({
    resolver: yupResolver(walletSchema),
    defaultValues: {
      balance: '' + data.balance
    }
  })

  const [_, updateWallet] = useAtom(updateWalletAtom)

  const handleClose = () => {
    updateWallet((wallet) => ({ ...wallet, open: false }))
  }

  const { mutate: update, isLoading } = useUpdateWallet()

  const handleSubmit = (item: FormProps) => {
    update({
      ...item,
      id: data.id
    })
  }

  return (
    <CenterComponent>
      <Form {...form}>
        <form className="min-w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardContent className="gap-y-2">
              <CardTitle className="my-4">{`Manage wallet for ${data.user.f_name} ${data.user.l_name}`}</CardTitle>
              <FormField
                name="balance"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="New Balance" {...field} className="my-2" />
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="submit" disabled={isLoading}>
                <div className="flex flex-row items-center justify-center">
                  {' '}
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span>Update</span>
                </div>
              </Button>
              <Button variant="destructive" onClick={handleClose}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </CenterComponent>
  )
}

export default ManageWallet
