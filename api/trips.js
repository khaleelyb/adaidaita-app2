const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// create trip
router.post('/create', async (req, res) => {
  const { rider_id, pickup_lat, pickup_lng, dest_lat, dest_lng, type='ride' } = req.body
  try{
    const { data, error } = await supabase.from('trips').insert([{
      rider_id, pickup_lat, pickup_lng, dest_lat, dest_lng, status: 'requested', type
    }]).select().single()
    if(error) return res.status(500).json({ error: error.message })
    return res.json({ trip: data })
  }catch(err){
    return res.status(500).json({ error: err.message })
  }
})

// accept trip
router.post('/:id/accept', async (req, res) => {
  const { id } = req.params
  const { driver_id } = req.body
  try{
    const { data, error } = await supabase.from('trips').update({ driver_id, status: 'accepted' }).eq('id', id).select().single()
    if(error) return res.status(500).json({ error: error.message })
    // Optionally broadcast to Supabase realtime or send push
    return res.json({ trip: data })
  }catch(err){
    return res.status(500).json({ error: err.message })
  }
})

module.exports = router
