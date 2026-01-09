import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import UsersLoadingSkeleton from '../components/UsersLoadingSkeleton.jsx'
import NoChatsFound from '../components/NoChatsFound.jsx'

function ContactList() {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUsersLoading) return <UsersLoadingSkeleton />
  if (allContacts.length === 0) return <NoChatsFound />

  return (
    <>
      {allContacts.map(contact => (
        <div
          key={contact._id}
          className='bg-cyan-500/10 p-4 rounder-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
          onClick={() => setSelectedUser(contact)}
        >
          <div className='flex items-senter gap-3'>
            {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
            <div className={`avatar ${onlineUsers.includes(contact._id) ? 'online' : 'offline'}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || '/avatar.png'} alt={contact.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList